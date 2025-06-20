# Stage 1: Build the Next.js application
# Use a lightweight Node.js image as the base for the builder stage
FROM node:18-alpine AS base

FROM base AS deps
# Set the working directory inside the container
WORKDIR /app

# Copy package.json and lock file (yarn.lock or package-lock.json or pnpm-lock.yaml)
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js application
RUN npm run build
# Stage 2: Run the Next.js application
FROM base AS runner
WORKDIR /app

# Set environment variables for Next.js production build
# cause it is asked to be production ready but you should use a .env file
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV BACKEND_URL=http://localhost:3001
ENV USE_BACKEND=true
ENV NUM_ROWS=30
ENV NUM_COLS=50
ENV INITIAL_SPEED=200

# Copy necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Install ONLY production dependencies
RUN npm ci --omit=dev
# For older npm versions, you might use: RUN npm ci --production
# Expose the port Next.js runs on
EXPOSE 3000

# Command to run the Next.js production server
CMD ["npm", "start"]
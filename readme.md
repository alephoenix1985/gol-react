# Conway's Game of Life - Next.js Challenge

This project is a Next.js implementation of Conway's Game of Life. It can run using local simulation logic or by connecting to a separate backend service.

## Features

*   Visual representation of Conway's Game of Life.
*   Ability to randomize the initial state of the grid.
*   Step-by-step simulation.
*   Continuous play/pause functionality.
*   Adjustable simulation speed.
*   Configurable grid dimensions.
*   Option to use a backend for game logic or run locally.

## Controls

The application provides several controls to interact with the Game of Life simulation.

### Main Controls

*   **Play/Pause Button**:
    *   **Play**: Starts or resumes the continuous simulation of the game, advancing generations at the current speed.
    *   **Pause**: Pauses the continuous simulation, freezing the grid in its current state.
*   **Step Button**:
    *   Advances the simulation by a single generation. This is useful for observing changes step-by-step, especially when the simulation is paused.
*   **Randomize Button**:
    *   Clears the current grid and populates it with a new random pattern of live and dead cells.
*   **Reset Button** (Assumed - common feature):
    *   Resets the grid to an empty state, with all cells dead.

### Advanced Controls

*   **Speed Control** (Slider -> slow-fast):
    *   Allows you to adjust the speed of the continuous simulation when in "Play" mode. A faster speed means generations advance more quickly. The initial speed can be set via the `INITIAL_SPEED` environment variable when running with Docker.
*   **Step Advance Control** (Input and go button):
    *   It jumps ahead the amount of steps in the input value.

## Running with Docker

You can run this Next.js application inside a Docker container.

### Prerequisites

*   Docker installed and running on your system.
*   A backend server (if `USE_BACKEND=true`) running and accessible from the Docker container (see `BACKEND_URL` below).

### Building the Docker Image

Navigate to the root directory of the project (where the `Dockerfile` is located) and run the following command in your terminal:

This will build a Docker image named `nextjs-game-of-life`.

### Running the Docker Container

Once the image is built, you can run it as a container.

**To connect to a backend running on your host machine (e.g., `http://localhost:3001` on your computer):**

*   **On Docker Desktop (Windows/Mac):**
    `host.docker.internal` is a special DNS name that resolves to your host machine's IP.

*   **On Linux:**
    You might need to use the `--add-host` flag or run with host networking.
    Using `--add-host`:
    Alternatively, using host networking (less isolated, but simpler for host backend access):
    *(Note: With `--network host`, the `BACKEND_URL` can be `http://localhost:3001` as the container shares the host's network. Port mapping `-p 3000:3000` is not needed as the app will directly use port 3000 on the host.)*

**To run without a backend (using local client simulation logic):**

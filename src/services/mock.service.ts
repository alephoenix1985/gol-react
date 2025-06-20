import {logger} from "@/services/logger.service";
import {NUM_COLS, NUM_ROWS} from "@/helpers/constant.helper";
import {singleStep} from "@/services/gol.service";

const MOCK_API_DELAY = 300;

export const beGet = async <T>(url: string): Promise<T> => {
    logger.info(`[SERVICE MOCK API] GET: ${url}`);
    await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));

    if (url === '/board/random') {
        const rows: number[][] = [];
        for (let i = 0; i < NUM_ROWS; i++) {
            rows.push(Array.from(Array(NUM_COLS), () => (Math.random() > 0.7 ? 1 : 0)));
        }
        return rows as T;
    }
    throw new Error(`Mock GET for ${url} not implemented`);
};
interface MoveRequestBody {
    board: number[][];
}
export const bePost = async <T>(url: string, body: MoveRequestBody): Promise<T> => {
    logger.info(`[SERVICE MOCK API] POST: ${url}`, body);
    await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));

    if (url.startsWith('/board/move/')) {
        const steps = parseInt(url.split('/').pop() || "1", 10);
        let tempBoard = JSON.parse(JSON.stringify(body.board));
        let changed = false;
        if (steps > 0) {
            const {board: b, hasChanged: hc} = singleStep(tempBoard);
            tempBoard = b;
            changed = hc;
        }
        return {board: tempBoard, hasChanged: changed} as T;
    }
    throw new Error(`Mock POST for ${url} not implemented`);
};
import { Injectable } from "@nestjs/common";


@Injectable()
export class TokenBlacklistService {
    private blacklist: Set<string> = new Set();

    add(token: string) {
        this.blacklist.add(token);
    }

    isBlacklisted(token: string): boolean {
        return this.blacklist.has(token);
    }
}
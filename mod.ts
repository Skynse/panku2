import * as panku from './lib/panku.ts';
import { parse } from "https://deno.land/std/flags/mod.ts";

export function main(args: string[]) {
    const arg = parse(args);
    
    if (arg.help || arg.h) {
        console.log(`
            Usage: deno run --allow-net --allow-read mod.ts [options]
            Options:
                -h, --help    Show help
                -l, --limit   Limit of posts to fetch
                -s, --sub     Subreddit to fetch
        `);
        return;
    }

    const limit = arg.limit || arg.l || 10;
    const sub = arg.sub || arg.s;

    if (!sub) {
        console.log('Subreddit is required');
        return;
    }

    panku.getPost(limit, sub).then(posts => {
        console.log(posts.map(post => `${post.title}\nby ${post.author}->${post.url}`).join('\n\n'));
    }
    ).catch(err => {
        console.log(err);
    }
    );

}
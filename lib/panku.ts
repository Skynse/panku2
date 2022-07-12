interface Post {
    selftext: any;
    author: string,
    title: string,
    content: string,
    url: string,
}

export function getPost(limit: number, subReddit: string) {
    return fetch(`https://www.reddit.com/r/${subReddit}.json?limit=${limit}`)
        .then(res => res.json())
        .then(json => json.data.children.map(child => child.data))
        .then(data => data.map((post: Post) => ({
            title: post.title,
            author: post.author,
            content: post.selftext,
            url: post.url
        })))
}
export const channels = [{
    name: '维基百科',
    prompt: '发送关键词可以从维基百科查询词条哦',
}, {
    name: '植物识别',
    prompt: '上传图片能识别植物哦（为了防止图片太大，请避免上传原图哦）',
}, {
    name: '谷歌搜索',
    prompt: '谷歌反爬太厉害了，nano暂时不能帮你搜索',
}, {
    name: '智能家居',
    prompt: 'nano帮你控制你的智能家居',
}]

function getChannel(name) {
    for (const channel of channels) {
        if (channel.name === name) {
            return channel
        }
    }
}

const handlers = []

handlers.push(async (ctx, next) => {
    const channel = getChannel(ctx.payload.content)
    if (channel
        && channel.name !== ctx.channel.get(ctx.payload.fromUserName)) {
        // set user context
        ctx.channel.set(ctx.payload.fromUserName, channel.name)
        ctx.text(channel.prompt)
        return
    }
    return next()
})

export default handlers

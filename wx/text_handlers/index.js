import rules from './rules'
import wiki, { help as wikiHelp } from './wiki'
import google, { help as googleHelp } from './google'
import babel, { help as babelHelp } from './babel'
import plant, { help as plantHelp } from './plant'
import iot, { help as iotHelp } from './iot'

/* text handlers */
const handlers = [
    ...rules,
    ...wiki,
    ...google,
    ...babel,
    ...plant,
    ...iot,
]

// eventually
handlers.push((ctx, next) => {
    const help = [
        '试试下列命令让nano帮你吧\n',
        wikiHelp,
        googleHelp,
        babelHelp,
        plantHelp,
        iotHelp,
    ]
    ctx.text(help.join('\n'))
})

export default handlers

import * as core from '@actions/core'
import {join} from 'path'
import * as dotenv from 'dotenv'

async function run(): Promise<void> {
  try {
    const filepath: string = join(process.cwd(), core.getInput('path'))
    const port = core.getInput('port')
    const env = core.getInput('env')
    const config = dotenv.config({path: filepath})?.parsed!

    core.info(`环境文件地址：${filepath}`)
    core.info(`端口：${config[port]}`)
    core.info(`环境:${config[env]}`)
    const code = Object.entries(config!)
      .reduce((a: string[], b) => a.concat([`${b[0]}=${b[1]}`]), [])
      .join('\n')
    core.info(`参数 >>>>\n ${code}`)
    core.setOutput('args', code)
    core.setOutput('port', config[port])
    core.setOutput('env', config[env])
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert';
import codeme from './codeme.js';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);
const tmpPath = path.join('./tmp', 'test-working-directory')

describe('codeme', function() {
  beforeEach(function() {
    if (fs.existsSync(tmpPath)) {
      fs.rmSync(tmpPath, { force: true })
    }
    fs.mkdirSync(tmpPath, { recursive: true });
  })

  it('generates failing test', async function() {
    const prompt = `Speaking Clock
      Write a JavaScript function that takes the time of day in digital format (e.g. '3:10') and returns the english language equivalent, as a string. Here are some examples:

      1:00
      one o'clock

      2:05
      five past two

      3:10
      ten past three

      4:15
      quarter past four

      5:20
      twenty past five

      6:25
      twenty five past six

      6:32
      six thirty two

      7:30
      half past seven

      7:35
      twenty five to eight

      8:40
      twenty to eight

      9:45
      quarter to ten

      10:50
      ten to eleven

      11:55
      five to twelve

      00:00
      midnight

      12:00
      noon
    `

    await codeme(prompt, { cwd: tmpPath })

    const { stdout } = await execPromise('node --test', { cwd: tmpPath })
    assert.match(stdout, /fail 1/)
  })
})


#!/usr/bin/env node

// IMPORTS
import { generatePrivateKey } from 'nostr-tools'
//const { generatePrivateKey } = nostrTools
import {
	getAllKeys
} from 'noskey'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

// args
const yarg = yargs(hideBin(process.argv))

// console.log(yargs)
const argv = yarg
	.usage('Usage: $0 [options]')
	.option('v', {
		alias: 'vanity',
		describe: 'Vanity string',
		type: 'string'
	})
	.option('n', {
		alias: 'npub',
		describe: 'npub Vanity string',
		type: 'string'
	})
	.option('p', {
		alias: 'priv',
		describe: 'Private key',
		type: 'string'
	})
	.help('h')
	.alias('h', 'help').argv

// INIT
// console.log(argv)
var vanity = argv.v || ''
var npubvanity = argv.n || ''



// MAIN
while (true) {
	var privateKey = argv.p || generatePrivateKey()
	var output = getAllKeys(privateKey)

	const npub_prefix = 'npub1'
	if (output.pubkey.startsWith(vanity) && output.npub.slice(npub_prefix.length).startsWith(npubvanity)) {
                var ret = { pubkey: output.pubkey, nrepo: output.nrepo }

		console.log(JSON.stringify(ret, null, 2))

		break
	}
}

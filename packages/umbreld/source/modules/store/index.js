import path from 'node:path'

import fse from 'fs-extra'

import FileStore from '../../utilities/file-store.js'

import UmbrelModule from '../../modules/umbrel-module.js'

class Store extends UmbrelModule {
	#store

	constructor(options) {
		super(options)

		this.#store = new FileStore({filePath: path.join(this.umbreld.dataDirectory, 'umbrel.yaml')})
	}

	async start() {
		const dataDirExists = await fse.pathExists(this.umbreld.dataDirectory)
		if (!dataDirExists) throw new Error('Data directory does not exist')

		// In the future we'll handle migrations here,
		// for now lets just write the version to check
		// read/write permissions are ok.
		await this.set('version', this.umbreld.version)
	}

	async get(property) {
		return this.#store.get(property)
	}

	async set(property, value) {
		return this.#store.set(property, value)
	}

	async delete(property) {
		return this.#store.delete(property)
	}

	async getWriteLock(job) {
		return this.#store.getWriteLock(job)
	}
}

export default Store

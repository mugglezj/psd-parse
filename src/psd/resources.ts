import File from './file'
import Resource from './Resource'

export default class Resources {
    resources = {}
    typeIndex = {}
    length = null
    file: File
    startPos:number
    endPos:number

    constructor(file) {
        this.file = file
    }

    skip() {
        this.length = this.file.readInt()
        this.file.seek(this.length, true)
    }

    parse() {
        this.startPos = this.file.tell()
        this.length = this.file.readInt()
        const finish = this.length + this.file.tell()
        let imageResources:any = {}
        imageResources.startPos = this.file.tell()
        imageResources.length = this.length
        imageResources.imageResources = {}
        while (this.file.tell() < finish) {
            let resource = new Resource(this.file)

            let block = resource.parse()
            imageResources.imageResources[block.id] = [block.detail]
            // let resourceEnd = this.file.tell() + resource.length
            //
            // let section = Resource.Section.factory(resource)
            // if (!section) {
            //     this.file.seek(resourceEnd)
            //     continue
            // }
            //
            // this.resources[section.id] = section
            // if (section.name) {
            //     this.typeIndex[section.name] = section.id
            //
            // }
            // this.file.seek(resourceEnd)

        }
        this.file.seek(finish)

        this.startPos = this.file.tell()
        return imageResources
    }

    resource(search) {
        if (typeof(search) == 'string') {
            this.byType(search)
        } else {
            this.resources[search]
        }
    }

    byType(name) {
        return this.resources[this.typeIndex[name]]
    }

}
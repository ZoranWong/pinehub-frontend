export default class Material {
  constructor(material) {
    this.idx = material['index'];
    this.mediaId = material['media_id'];
    this.title = material['title'];
    this.introduction = material['introduction'];
    this.updateTime = material['update_time'];
    this.url = material['url'];
  }
}

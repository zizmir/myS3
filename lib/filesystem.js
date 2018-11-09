import fs from 'fs';
import path from 'path';

class FileSystem {
  constructor() {
    if (!FileSystem.instance) {
      FileSystem.instance = this;
      this.initialze();
    }
  }

  initialze() {
    this.path = '/opt/workspace/myS3';
    this.currentPath = '';
  }

  addUserWorkspace(user) {
    const pathname = path.join(this.path, user.uuid);

    if (!fs.existsSync(pathname)) {
      fs.mkdirSync(pathname);
    }
  }

  createBucket(user, bucketName) {
    if (!fs.existsSync(this.path)) {
      throw Error("Workspace myS3 doesn't exists");
    }
    if (!fs.existsSync(path.join(this.path, user.uuid))) {
      console.log('hello');
      this.addUserWorkspace(user);
    }
    fs.mkdirSync(path.join(this.path, user.uuid, bucketName));

  }

  removeBucket(user, bucketName) {
    try {
      const pathname = path.join(this.path, user, bucketName);
      if (!fs.existsSync(pathname)) {
        fs.rmdir(pathname);
        throw Error("This bucket directory doesn't exists ");
      }
    } catch (err) {}
  }
  createBlob(user, bucketName, blobName) {}

  removeBlob(user, buckName, blobName) {}
}

const instance = new FileSystem()
export default instance;

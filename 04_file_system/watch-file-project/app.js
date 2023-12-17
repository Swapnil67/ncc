const fs = require("fs/promises");

// * Commands
const CREATE_FILE = 'create a file';
const RENAME_FILE = 'rename the file';
const ADD_TO_FILE = 'add to file';
const DELETE_FILE = 'delete the file';

(async () => {

  const createFile = async (path) => {
    try {
      // * We already have a file
      const existingFileHandle = await fs.open(path, 'r');
      console.log(`The file ${path} already exists.`);
      existingFileHandle.close();
    } catch (err) {
      const newFileHandle = await fs.open(path, 'w');
      console.log("The file was successfully created.");
      newFileHandle.close();
    } 
  }

  const deleteFile = async (path) => {
    try {
      await fs.unlink(path);
      console.log(`successfully deleted ${path}`);
    } catch (error) {
      if(error.code === 'ENOENT') {
        console.log("No file at this path to remove");
      }
      console.log("Something went wrong while deleting the file", error);
    }
  }

  const renameFile = async (oldPath, newPath) => {
    console.log(`Rename ${oldPath} to ${newPath}`);
    try {
      fs.rename(oldPath, newPath);
      console.log(`Successfully renamed the ${oldPath} to ${newPath}`);
    } catch (err) {
      if(err.code === 'ENOENT') {
        console.log("No file at this path to rename or destination does not exists.");
      }
      console.log("Something went wrong while renaming the file ", err);
    }
  }


  let addedContents;
  const addToFile = async (path, content) => {
    if(addedContents == content) return;
    try {
      // * 'a' -> Appends the content to file
      // * 'w' -> Truncates the file then adds the content to file
      const fileHandle = fs.open(path, 'a');
      (await fileHandle).write(content)
      addedContents = content;
      // const data = new Uint8Array(Buffer.from(content));
      // await fs.writeFile(path, data);
      console.log("Content Successfully Written");
    } catch (err) {
      if(err.code === 'ENOENT') {
        console.log("No file at this path to write");
      }
      console.log("Something went wrong while writing to a file", err);
    }
  }

  // * This returns a file descriptor
  const commandFileHandler = await fs.open("./command.txt", "r");

  commandFileHandler.on("change", async () => {
    // * We want to read the content
    // * Get the size of our file
    const commandFileStat = await commandFileHandler.stat();
    const size = commandFileStat.size;

    // * Allocate our buffer with the size of our file
    const buff = Buffer.alloc(size);

    // * The location at which we want to start filling our buffer
    const offset = 0;

    // * Position that we want to start reading the file from
    const position = 0;

    // * How many bytes we want to read
    const length = buff.length;

    const content = await commandFileHandler.read(
      buff,
      offset,
      length,
      position
    );
    const command = buff.toString('utf-8');

    // * Create a file:
    // * create a file <path>
    if(command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      await createFile(filePath);
    }

    // * add to file:
    // * add to file <path> this content: <content>
    if(command.includes(ADD_TO_FILE)) {
      const _idx = command.indexOf(' this content: ');
      const filePath = command.substring(ADD_TO_FILE.length + 1, _idx);
      const content = command.substring(_idx+15);
      await addToFile(filePath, content);
    }

    // * delete a file:
    // * delete a file <path>
    if(command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);
      await deleteFile(filePath);
    }

    // * rename the file:
    // * rename the file <oldPath> <newPath>
    if(command.includes(RENAME_FILE)) {
      const _idx = command.indexOf(' to ');
      const oldPath = command.substring(RENAME_FILE.length + 1, _idx);
      const newPath = command.substring(_idx + 4);
      await renameFile(oldPath, newPath);
    }
    

  });

  // * File Watcher
  const watcher = fs.watch("./command.txt");
  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandler.emit("change");
    }
  }
})();

/*
 * File Descriptor is a unique number assigned to a file
 *
 */

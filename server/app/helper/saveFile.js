const path = require('path');
const fs = require('fs');

class SaveFile {
    /**
     * Constructor for initializing the folder path and original name.
     *
     * @param {string} filePath - the file path to be joined with the upload directory
     * @param {string} originalName - the original name of the file
     */
    constructor(filePath, originalName) {
        this.folder = path.join(__dirname, `../../storage/upload/${filePath}`);
        this.originalName = originalName;
    }

    async save(buffer) {
        const filename = await SaveFile.filename(this.originalName, this.folder);
        const filepath = this.filepath(filename);
        const that = this;
        fs.access(this.folder, function (error) {
            if (error) fs.mkdir(that.folder, {recursive: true}, (err) => {
                if (err) throw err;
                else that.fileSave(buffer, filepath).then(r => r)
            });
            else that.fileSave(buffer, filepath).then(r => r)
        })
        return filename;
    }

    /**
     * Check if a file exists at the specified file path and name.
     *
     * @param {string} filePath - The path to the directory containing the file.
     * @param {string} fileName - The name of the file to check for existence.
     * @return {Promise<boolean>} A promise that resolves to true if the file exists, false otherwise.
     */
    static fileExists(filePath, fileName) {
        return new Promise((resolve) => {
            fs.access(path.join(filePath, fileName), fs.constants.F_OK, error => {
                resolve(!error);
            });
        });
    }

    static async filename(originalName, filePath) {
        const baseName = path.basename(originalName, path.extname(originalName)); // Extract filename without extension
        const ext = path.extname(originalName); // Get file extension

        let newFileName = `${baseName}${ext}`; // Start with original filename
        let counter = 1;
        // Check if file already exists
        while (await SaveFile.fileExists(filePath, newFileName)) {
            counter++;
            newFileName = `${baseName}-${counter}${ext}`;
        }
        return newFileName;
    }

    filepath(filename) {
        return path.join(this.folder, filename);
    }

    fileSave(buffer, filepath) {
        return new Promise((resolve, reject) => {
            fs.writeFile(filepath, buffer, (err) => {
                if (err) reject(err);
                resolve(filepath);
            });
        });
    }

}

module.exports = SaveFile;
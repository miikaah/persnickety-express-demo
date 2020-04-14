import { promises as fs } from "fs";

class FsRepository {
  constructor(file) {
    this.file = file;
  }

  async read() {
    try {
      return JSON.parse(await fs.readFile(this.file, { encoding: "utf-8" }));
    } catch (e) {
      if (e.code === "ENOENT") {
        this.write();
      }
      return [];
    }
  }

  async write(data = []) {
    await fs.writeFile(this.file, JSON.stringify(data), { encoding: "utf-8" });
  }
}

export default class Repository {
  constructor(filename) {
    this.repo = new FsRepository(filename);
  }

  async getAll() {
    return this.repo.read();
  }

  async getById(id) {
    const model = (await this.repo.read()).find((model) => model.id === id);
    if (!model) throw new Error("Model not found");
    return model;
  }

  async add(model) {
    const models = await this.repo.read();
    await this.repo.write([...models.filter((m) => m.id !== model.id), model]);
  }

  async remove(id) {
    const models = await this.repo.read();
    await this.repo.write(models.filter((m) => m.id !== id));
  }
}

export class InterruptTask {
	public lastIssuedId = 0;

	public GetId(): number {
		if (this.lastIssuedId === 1000000000) this.lastIssuedId = 0;
		return ++this.lastIssuedId;
	}

	public Abort() {
		if (this.lastIssuedId === 1000000000) this.lastIssuedId = 0;
		++this.lastIssuedId;
	}

	public CheckTask(id: number) {
		return this.lastIssuedId === id;
	}
}
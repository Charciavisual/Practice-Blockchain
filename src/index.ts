class Block {
  public index: number;
  public hash: string;
  private previousHash: string;
  public data: string;
  public timestamp: number;
  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const genesisBlock: Block = new Block(0, "2020202020202", "", "Hello", 123456);

let blockchain: [Block] = [genesisBlock]; //Block 클래스 타입만 배열에 저장할 수 있다. -> typescript를 사용할 때의 장점

console.log(blockchain);

export {};

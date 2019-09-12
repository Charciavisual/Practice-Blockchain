import * as CryptoJS from "crypto-js";

class Block {
  //static method : 블록을 생성하지 않아도 사용할 수 있도록
  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string =>
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.data === "string" &&
    typeof aBlock.timestamp === "number";

  public index: number;
  public hash: string;
  public previousHash: string;
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
let blockchain: Block[] = [genesisBlock]; //Block 클래스 타입만 배열에 저장할 수 있다. -> typescript를 사용할 때의 장점

/* 전체 블록을 가져온다 */
const getBlockchain = (): Block[] => blockchain;
/* 마지막 블록을 가져온다 */
const getLatestBlock = (): Block => blockchain[blockchain.length - 1];
/* 새로운 timestamp 생성 */
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);
/**
 * 새로운 블록을 생성
 * @param data 블록에 저장할 데이터
 */
const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimeStamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    newTimeStamp,
    data
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimeStamp
  );
  addBlock(newBlock);
  return newBlock;
};

/**
 * 블록의 해쉬값을 계산
 * @param aBlock 해쉬값을 계산할 블록
 */
const getHashForBlock = (aBlock: Block): string =>
  Block.calculateBlockHash(
    aBlock.index,
    aBlock.previousHash,
    aBlock.timestamp,
    aBlock.data
  );

/**
 * 블록을 추가하기 전 올바른 블록인지 검증
 * @param candidateBlock 새로 추가할 블록
 * @param previousBlock 이전 블록
 */
const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    //블록 구조가 올바르지 않은 경우
    return false;
  } else if (previousBlock.index + 1 !== candidateBlock.index) {
    //이전 블록의 다음 인덱스가 아닌경우
    return false;
  } else if (previousBlock.hash !== candidateBlock.previousHash) {
    //이전 블록의 해쉬값과 previousHash값이 다른경우
    return false;
  } else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
    //입력된 해쉬값이 계산된 해쉬값과 다른경우
    return false;
  } else {
    return true;
  }
};

/**
 * 블록을 체인에 추가
 * @param candidateBlock 새로 추가할 블록
 */
const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    blockchain.push(candidateBlock);
  }
};

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(getBlockchain());
export {};

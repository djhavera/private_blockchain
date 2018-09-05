const leveldb = require('./levelSandbox'); 
const SHA256 = require('crypto-js/sha256');

class Block{
  constructor(data){
     this.hash = "";
     this.height = 0;
     this.body = data;
     this.time = 0;
     this.previousBlockHash = "";
    }
}

class Blockchain{ 
    constructor(){ 
    this.getBlockHeight().then((height) => { 
    if (height === -1){ 
    this.addBlock(new Block("Genesis Block")).then(() => console.log("Genesis Block added")); }});
    }
    
    async addBlock(newBlock) { 
        const height = parseInt(await this.getBlockHeight()) ;
        newBlock.height = height + 1; 
        newBlock.time = new Date().getTime().toString().slice(0,-3); 
        
        if (newBlock.height > 0) { 
        const prevBlock = await this.getBlock(height); 
        newBlock.previousBlockHash = prevBlock.hash; 
        console.log('Previous hash: ' + newBlock.previousBlockHash);
        } 
        
        newBlock.hash = SHA256(JSON.stringify(newBlock)).toString(); 
        console.log('New Block hash value: ' + newBlock.hash);
        
        await leveldb.addBlock(newBlock.height, JSON.stringify(newBlock)); 
        } // End of addBlock
    
    async getBlockHeight() { 
        const height = await leveldb.getBlockHeight();
        console.log('Chain Height: ' + height); 
        return height; 
    } // end get BlockHeight

    async getBlock(blockHeight) { 
        const block = await leveldb.getBlock(blockHeight);
        console.log(block);
        return block; 
    } // end getBlock
    
    async validateBlock(blockHeight) { 
            // get block object
            let block = await this.getBlock(blockHeight); 
            //let block = await leveldb.getBlock(blockHeight); 
            //let block = .getBlock(blockHeight); 
            //console.log('Validate Block: ' + block);
            // get block hash 
            let blockHash = block.hash;
            // remove block hash to test block integrity 
            block.hash = ''; 
            console.log("BLOCKHASH____________________" + blockHash);
            let validBlockHash = SHA256(JSON.stringify(block)).toString(); 
            console.log("VALIDBLOCKHASH____________________" + validBlockHash);
            console.log('Validate Block: ' + JSON.stringify(block).toString());
            if (blockHash === validBlockHash) { 
                console.log('Block #' + blockHeight + ' validated'); 
                return true; } 
            else { console.log('Block #' + blockHeight + ' invalid hash:\n' + blockHash + '<>' + validBlockHash); 
                    return false; } 
      } // the end of validateBlock function       

                
    } // End Blockchain Class
        // Compare 
        /*
        if (blockHash === validBlockHash) 
        { 
            console.log('Block #' + blockHeight + ' is validated'); 
            return true; } 
        else { 
            console.log('Block #' + blockHeight + ' contains an invalid hash:\n' + blockHash + '<>' + validBlockHash); 
            return false; }

  async validateChain() { 
    let errorLog = [] ;
    let previousHash = '' ;
    let isValidBlock = false;
    
    // get chain height (height of latest persisted block)
    const height = await this.getBlockHeight();
    // loop over all blocks in persisted chain
    for (let i = 0; i <= height; i++) {
        this.getBlock(i).then((block) => {
        // validation of current block
        isValidBlock = this.validateBlock(block.height);
        if (!isValidBlock) {
            errorLog.push(i);
        } 
        // validate previous persisted block hash matches currenBlock.previousHash 
        if (block.previousBlockHash !== previousHash) {
            errorLog.push(i);
        }
        previousHash = block.hash
        // logging errors to console
        if (i === (height -1)) {
            if (errorLog.length > 0) {
            //console.log('Block errors =' + ${errorLog.length});
            //console.log('Blocks:' + ${errorLog});
        console.log('Errors detected');
    
            } else {
            console.log('No errors detected');
            }
        }
        });
        } //end of for loop
    } // end of validateChain method       


(function theLoop (i) {
	setTimeout(function () {
        let blockchain = new Blockchain();
		let blockTest = blockchain.addBlock(new Block("test data "+i));
		blockchain.addBlock(blockTest).then((result) => {
			console.log(result);
			i++;
			if (i < 10) theLoop(i);
		});
	}, 10);
  })(0);
*/
let blockchain = new Blockchain();
//blockchain.addBlock(new Block("David data "+300));
//blockchain.getBlockHeight();
blockchain.getBlock(69);
blockchain.validateBlock(69); 
  

  

  

  
  

pragma solidity >=0.4.22 < 0.6.0;

contract PetitionContract {
  struct Petition {
    string author_id;
    string content;
    uint signaturesCount;
    uint signaturesLimitCount;
  }

  struct Signer {
    uint petition_id;
    string signer_id;
    bool signed;
    uint signed_at;
  }

  address public owner;

  mapping(bytes32 => Signer) public signerTable;
  mapping(uint => Petition) public petitionTable;

  event Registered(bytes32 author_id, uint timestamp);
  event Signed(bytes32 signer, uint timestamp);

  constructor() public {
    owner = msg.sender;
  }

  function register(uint petition_id, string memory _author_id, string _content, uint _signaturesCount, uint _signaturesLimitCount) payable public {
    petitionTable[petition_id] = Petition({author_id: _author_id, content: _content, signaturesCount: _signaturesCount, signaturesLimitCount: _signaturesLimitCount});
    
    owner.transfer(msg.value);

    bytes32 author_id_bytes = keccak256(abi.encode(_author_id));
    emit Registered(author_id_bytes, now);
  }

  function sign(uint _petition_id, string _signer_id, string memory signature) public {
    bytes32 key = keccak256(abi.encode(signature));
    // require(!signerTable[key].signed);
    
    signerTable[key] = Signer({petition_id: _petition_id, signer_id: _signer_id, signed: true, signed_at: now});
    
    emit Signed(key, now);
  }
}

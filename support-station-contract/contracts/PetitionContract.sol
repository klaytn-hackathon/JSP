pragma solidity >=0.4.22 < 0.6.0;

contract PetitionContract {
  struct Petition {
    string author_id;
    string title;
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

  function getBalance() private view returns (uint) {
    return address(this).balance;
  }

  function register(uint petition_id, string memory _author_id, string _title, string _content, uint _signaturesLimitCount) public payable {
    require(msg.sender.balance > msg.value);

    petitionTable[petition_id] = Petition({author_id: _author_id, title: _title, content: _content, signaturesCount: 0, signaturesLimitCount: _signaturesLimitCount});

    owner.transfer(msg.value);

    bytes32 author_id_bytes = keccak256(abi.encode(_author_id));
    emit Registered(author_id_bytes, now);
  }

  function sign(uint _petition_id, string _signer_id, string memory signature) public {
    bytes32 key = keccak256(abi.encode(signature));

    require(!signerTable[key].signed, 'Already signed');
    require(petitionTable[_petition_id].signaturesCount + 1 < petitionTable[_petition_id].signaturesLimitCount, 'Limit exceeded');

    signerTable[key] = Signer({petition_id: _petition_id, signer_id: _signer_id, signed: true, signed_at: now});

    emit Signed(key, now);
  }

  function getSignaturesCount(uint petition_id) public view returns(uint) {
    bytes memory author_id = bytes(petitionTable[petition_id].author_id);
    require(author_id.length != 0);
    
    return petitionTable[petition_id].signaturesCount;
  }

  function withdrawal() public {
    require(msg.sender == owner);

    msg.sender.transfer(getBalance());
  }
}

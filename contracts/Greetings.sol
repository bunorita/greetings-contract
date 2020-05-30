pragma solidity ^0.6.6;


contract Greetings {
    string public message;

    constructor(string memory initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string memory newMessage)
        public
        returns (string memory)
    {
        message = newMessage;
        return message;
    }
}

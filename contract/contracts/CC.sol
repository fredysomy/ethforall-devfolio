//SPDX-License-Identifier: MIT
pragma solidity >=0.8.1;
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";


import "./CCNFT.sol";

interface USDCToken {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

contract CC is CCNFT{
    ERC20 public usdcToken;
    address owner;
    
    struct Service {
        uint256 serviceID;
        //uint serviceProviderID;
        address provider;
        uint256 amount;
        uint256 startTime;
        uint256 endTime;
        uint256 duration;
        uint256 maxNumberOfTickets;
        string description;
        address recvaddress;
        string serviceName;
       // bool serviceDisabled;
        }
    struct Receiver{
        uint rid;
        address raddress;
        string rName;
    }

    constructor() {
        owner = msg.sender;
        usdcToken = ERC20(0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1);
     }

    // struct ServiceProvider{
    //     address SPaddress;  
    //     uint256[] servicesProvided;
    // }

    

    mapping(uint256 => Service)  services; //    mapping(uint => serviceID)  services;
    mapping(address => ServiceProvider) serviceproviders;     //mapping(uint => spid) serviceproviders;
    mapping(uint256 => uint256) ticketNumber; //mapping serviceID to ticketNumber
    // mapping(address => bool) isServiceProvider;
    mapping(uint256 => bool) serviceEnabled; //checks if service is enabled.
    mapping(uint => Receiver) receivers; //    mapping(uint => rid) receivers;
    mapping(address => Receiver) receiversByAddress;
    mapping(address => mapping(uint256 => uint256[])) public donatorsToDonations; //mapping the donations of a user to the serviceID, which is further mapped to an array of tokenIDs of the donations.
    mapping(address => uint256[]) public servicesProvidedByAddress;

    uint serviceCount = 0;
    uint spcount = 0;
    uint receivercount = 0;

    modifier restrictToOwner() {
        require(msg.sender == owner, 'Method available only to the to the user that deployed the contract');
        _;
    }

      modifier validateDestination(address payable raddress) {
        require(msg.sender != raddress, 'Sender and recipient cannot be the same.');
        _;
    }

    modifier validateCharity(uint256 charityIndex) {
        //require( charityIndex <= receivers.length - 1, 'Invalid charity index.');
        require(receivers[charityIndex].raddress != address(0) ,'index cannot be zero');
        _;
    }

    modifier validateTransferAmount() {
        require(msg.value > 0, 'Transfer amount has to be greater than 0.');
        _;
    }

    event Donation(
        address indexed spaddress,
        uint256 amount
    );
    

    function registerNewService(address provider, uint256 amount, uint256 duration, uint256 maxNumberOfTickets, string memory description,address recvaddress, string memory serviceName) public {
            
            uint256 startTime = block.timestamp;
            uint256 endTime = startTime + duration;
            services[serviceCount] = Service(serviceCount, provider, amount, startTime, endTime, duration, maxNumberOfTickets, description, recvaddress, serviceName);
            serviceCount += 1;
    }

    // function registerNewSP(uint spid, address spaddress) public {
    //         serviceproviders[spcount] = serviceprovider(spid, spaddress);
    //         spcount += 1;
    // }
    
    function registerNewR(uint rid, address raddress, string memory rName) public restrictToOwner(){ //need to add a onlyOwner modifier
            receivers[receivercount] = new Receiver(rid, raddress,rName);
            receiversByAddress[raddress] = new Receiver(rid,raddress, rName);

            receivercount += 1;
    }

    function donateToService(uint serviceID) public{
                Service memory service = services[serviceID];
                require(service.duration - block.timestamp > 0, "Service has expired");
                require(serviceEnabled != true, "Service is disabled"); // service should not be disabled
                require(service.amount > 0, "amount should be > 0");
                require(++ticketNumber[serviceID] <= service.maxNumberOfTickets, "MAX NUMBER OF TICKETS ALREADY MINTED FOR THE SERVICE");


                // transfer USDC
                //usdcToken.approve(address(this), 2000000000000000000);
                //usdcToken.transferFrom(msg.sender, service.recvaddress, service.amount);
       
                // if(service.amountOfServices == 0 || service.duration - block.timestamp <= 0){
                // _disableService(service.service_id);
                
                //mint NFT
                /*function makeAnEpicNFT(
                                        string memory donatorAddr,
                                        string memory donatedAmount,
                                        string memory receiverName,
                                        string memory serviceName,
                                        string memory serviceProviderLensHandle
                                )*/     
                        uint tokenID = makeAnEpicNFT(msg.sender,
                                Strings.toString(service.amount),
                                receiversByAddress[service.recvaddress].rName,
                                service.serviceName,
                                ticketNumber[serviceID]
                        );
                donatorsToDonations[msg.sender][serviceID].push(tokenID);    console.log("An NFT has been minted to %s", msg.sender);

                console.log(donatorsToDonations[msg.sender][serviceID][0]);
                                console.log(donatorsToDonations[msg.sender][serviceID][1]);
                                                console.log(donatorsToDonations[msg.sender][serviceID][2]);


       }


    function getServices(uint256 serviceID) view public returns(Service memory) {
            return services[serviceID];
    }

    // function enabledServices(address from, address to, uint256 value) public returns (bool);
    
    function getreceivers(uint rid) view public returns(Receiver memory) {
            return receivers[rid];
    }

    // function getserviceproviders(address spAddr) view public returns(ServiceProvider memory) {
    //         return serviceproviders[spAddr];
    // }

    function getServicesDonatedByUser() view public returns (uint256[] memory){
            return donatorsToServices[msg.sender];
    }
}
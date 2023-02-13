pragma solidity ^0.8.0;

// We need some util functions for strings.
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

import { Base64 } from "./libraries/Base64.sol";


contract CCNFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;


  // This is our SVG code. All we need to change is the word that's displayed. Everything else stays the same.
  // So, we make a baseSvg variable here that all our NFTs can use.
  string svgPartOne = "<svg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg' xmlns:bx='https://boxy-svg.com'><defs><radialGradient gradientUnits='userSpaceOnUse' cx='248.844' cy='248.844' r='249.769' id='gradient-0' spreadMethod='pad' gradientTransform='matrix(1.0395 0 0 1 -8.448 1)'><stop offset='0' style='stop-color:#000'/><stop offset='1' style='stop-color:#000'/></radialGradient><linearGradient gradientUnits='userSpaceOnUse' x1='248.844' y1='-1.233' x2='248.844' y2='498.921' id='gradient-1' gradientTransform='matrix(.80398 -.63388 .68702 .80641 -18.229 220.787)'><stop offset='0' style='stop-color:#76d596'/><stop offset='1' style='stop-color:#0da8b0'/></linearGradient><style bx:fonts='Montserrat'>@import url(https://fonts.googleapis.com/css2?family=Montserrat%3Aital%2Cwght%400%2C100%3B0%2C200%3B0%2C300%3B0%2C400%3B0%2C500%3B0%2C600%3B0%2C700%3B0%2C800%3B0%2C900%3B1%2C100%3B1%2C200%3B1%2C300%3B1%2C400%3B1%2C500%3B1%2C600%3B1%2C700%3B1%2C800%3B1%2C900&amp;display=swap);</style></defs><path style='stroke:url(#gradient-0);paint-order:fill;stroke-width:0;fill:url(#gradient-1)' d='M-9.409-.233h519.272v500.154H-9.409z'/><text style='white-space:pre;fill:#333;font-family:Arial,sans-serif;font-size:21.6px' x='28.679' y='39.47'>Donator: ";
  string svgPartTwo = "</text><text style='white-space:pre;fill:#333;font-family:Arial,sans-serif;font-size:21.6px' x='31.761' y='109.775'>Receiver: ";
  string svgPartThree = "</text><text style='fill:#333;font-family:Montserrat;font-size:26px;font-weight:700;white-space:pre' transform='translate(-353.993 111.625)'><tspan x='382.054' y='122.109'>Service Name: ";
  string svgPartFour = "</tspan></text><text style='white-space:pre;fill:#333;font-family:Arial,sans-serif;font-size:21.6px' x='205.674' y='477.336'>Service Provider: ";
  string svgPartFive = "</text><text style='fill:#333;font-family:Arial,sans-serif;font-size:29px;font-weight:700;white-space:pre' x='30.22' y='77.09'>";
  string svgPartSix = "USDC</text></svg>";


  event NewEpicNFTMinted(address sender, uint256 tokenId);

  constructor() ERC721 ("CCNFT", "CCNFT") {
  }
  function getTotalNFTsMintedSoFar() public view returns(uint256){
    uint256 totalNFTsMinted = _tokenIds.current() + 1;
    return totalNFTsMinted;
  }

  function makeAnEpicNFT(
      address donatorAddr,
      string memory donatedAmount,
      string memory receiverName,
      string memory serviceName,
      uint256 ticketNumber
  ) public returns (uint) {
    uint256 newItemId = _tokenIds.current();

    string memory donatorAddress = Strings.toHexString(donatorAddr);

    string memory Svg = string(abi.encodePacked(svgPartOne, donatorAddress, svgPartTwo, receiverName, svgPartThree, serviceName, svgPartFour, serviceProviderLensHandle, svgPartFive));
    string memory finalSvg = string(abi.encodePacked(Svg, donatedAmount, svgPartSix));
    // Get all the JSON metadata in place and base64 encode it.
    string memory json = Base64.encode(
        bytes(
            string(
                abi.encodePacked(
                    '{"name": "',
                    // We set the title of our NFT as the generated word.
                   serviceName,
                    '", "description": "A highly acclaimed collection of squares.", "image": "data:image/svg+xml;base64,',
                    // We add data:image/svg+xml;base64 and then append our base64 encode our svg.
                    Base64.encode(bytes(finalSvg)),
                    '", "properties": {"donator": "', donatorAddress, '", "receiverName": "', receiverName, '", "amount": "', donatedAmount,
                     '", "serviceProvider": "',
                    serviceProviderLensHandle,
                    '"}}'
                )
            )
        )
    );

    // Just like before, we prepend data:application/json;base64, to our data.
     string memory finalTokenUri = string(
        abi.encodePacked("data:application/json;base64,", json)
    );


    console.log("\n--------------------");
    console.log(finalTokenUri);
    console.log("--------------------\n");

    _safeMint(msg.sender, newItemId);
    
    // Update your URI!!!
    _setTokenURI(newItemId, finalTokenUri);
  
    _tokenIds.increment();
    console.log("An NFT has been minted to %s", msg.sender);
    emit NewEpicNFTMinted(msg.sender, newItemId);
    return newItemId;
  }

}
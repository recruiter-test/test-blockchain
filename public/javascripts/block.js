/////////////////////////
// Mining & Hash Logic
/////////////////////////

var difficultyMajor = 4;
var difficultyMinor = 15;
var maximumNonce = 8;

var pattern = '';
for (var x = 0; x < difficultyMajor; x++) {
  pattern += '0';
  maximumNonce *= 16;
}
pattern += difficultyMinor.toString(16);
var patternLen = pattern.length;

if (difficultyMinor == 0) maximumNonce *= 16;
else if (difficultyMinor == 1) maximumNonce *= 8;
else if (difficultyMinor <= 3) maximumNonce *= 4;
else if (difficultyMinor <= 7) maximumNonce *= 2;


/////////////////////////
// Mining Functions
/////////////////////////

function getText(block, chain) {
  return $('#block' + block + 'chain' + chain + 'number').val() +
         $('#block' + block + 'chain' + chain + 'nonce').val() +
         $('#block' + block + 'chain' + chain + 'data').val();
}

function sha256(block, chain) {
  return CryptoJS.SHA256(getText(block, chain));
}

function updateState(block, chain) {
  if ($('#block' + block + 'chain' + chain + 'hash').val().substr(0, patternLen) <= pattern) {
    $('#block' + block + 'chain' + chain + 'well').removeClass('well-error').addClass('well-success');
  } else {
    $('#block' + block + 'chain' + chain + 'well').removeClass('well-success').addClass('well-error');
  }
}

function updateHash(block, chain) {
  $('#block' + block + 'chain' + chain + 'hash').val(sha256(block, chain));
  updateState(block, chain);
}

function mineButtonAnimation(block, chain) {
  $('#block' + block + 'chain' + chain + 'mineButton').click(function (e) {
    e.preventDefault();

    var l = Ladda.create(this);
    l.start();

    setTimeout(function () {
      mine(block, chain, false);
      l.stop();
    }, 250);
  });
}

function mine(block, chain, isChain) {
  for (var x = 0; x <= maximumNonce; x++) {
    $('#block' + block + 'chain' + chain + 'nonce').val(x);
    $('#block' + block + 'chain' + chain + 'hash').val(sha256(block, chain));

    if ($('#block' + block + 'chain' + chain + 'hash').val().substr(0, patternLen) <= pattern) {
      updateState(block, chain);
      break;
    }
  }
}


/////////////////////////
// Initialize
/////////////////////////
$(function () {
  $('#block1chain1number').on('input', function () { updateHash(1, 1); });
  $('#block1chain1nonce').on('input', function () { updateHash(1, 1); });
  $('#block1chain1data').on('input', function () { updateHash(1, 1); });

  mineButtonAnimation(1, 1);
  updateHash(1, 1);
});

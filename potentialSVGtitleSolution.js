const string1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const textLineLength = 4;

function multiLine (str) {
  const split = str.split(' ');

  const recon = [];
  const reconRejoin = [];
  let reconRejoinText = '';

  while (split.length > 0) {
    recon.push(split.splice(0, textLineLength));
  }

  for (i = 0; i < recon.length; i++) {
    reconRejoin.push(recon[i].join(' '));
  }

  for (i = 0; i < reconRejoin.length; i++) {
    reconRejoinText += "<div>" + reconRejoin[i] + "</div>";
  }

  return reconRejoinText;

}

multiLine(string1);


// create indeterminate number of new lines from one string.
// split by 5 words, add spaces back indeterminate
// add new lines

// next, split up by character numbers instead

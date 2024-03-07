let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");
//List of fontlist
let fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "cursive",
];
//Initial Settings
const initializer = () => {
  //function calls for highlighting buttons
  //No highlights for link, unlink,lists, undo,redo since they are one time operations
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);
  //create options for font names
  fontList.map((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });
  //fontSize allows only till 7
  for (let i = 1; i <= 7; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
  }
  //default size
  fontSizeRef.value = 3;
};
//main logic
const modifyText = (command, defaultUi, value) => {
  //execCommand executes command on selected text
  document.execCommand(command, defaultUi, value);
};
//For basic operations which don't need value parameter
optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});
//options that require value parameter (e.g colors, fonts)
advancedOptionButton.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);
  });
});
//link
linkButton.addEventListener("click", () => {
  let userLink = prompt("Enter a URL");
  //if link has http then pass directly else add https
  if (/http/i.test(userLink)) {
    modifyText(linkButton.id, false, userLink);
  } else {
    userLink = "http://" + userLink;
    modifyText(linkButton.id, false, userLink);
  }
  window.open(userLink, "_blank");
});
//Highlight clicked button
const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      //needsRemoval = true means only one button should be highlight and other would be normal
      if (needsRemoval) {
        let alreadyActive = false;
        //If currently clicked button is already active
        if (button.classList.contains("active")) {
          alreadyActive = true;
        }
        //Remove highlight from other buttons
        highlighterRemover(className);
        if (!alreadyActive) {
          //highlight clicked button
          button.classList.add("active");
        }
      } else {
        //if other buttons can be highlighted
        button.classList.toggle("active");
      }
    });
  });
};
const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove("active");
  });
};
window.onload = initializer();

// const convertBoldToRtf = (html) => {
//   return html.replace(/<b>(.*?)<\/b>/g, "{\\b $1}");
// };

// const convertItalicToRtf = (html) => {
//   return html.replace(/<i>(.*?)<\/i>/g, "{\\i $1}");
// };

// const convertUnderlineToRtf = (html) => {
//   return html.replace(/<u>(.*?)<\/u>/g, "{\\ul1 $1\\ul0}");
// };

// const convertStrikeoutToRtf = (html) => {
//   return html.replace(/<strike>(.*?)<\/strike>/g, "{\\strike $1}");
// };

// const convertSuperscriptToRtf = (html) => {
//   return html.replace(/<sup>(.*?)<\/sup>/g, "{\\super $1}");
// };

// const convertSubscriptToRtf = (html) => {
//   return html.replace(/<sub>(.*?)<\/sub>/g, "{\\sub $1}");
// };
// function htmlToRtf(html) {
//   html = html.replace(/<br>/g, "\\line ");

//   // Convert other HTML tags to RTF format
//   html = convertBoldToRtf(html);
//   html = convertItalicToRtf(html);
//   html = convertUnderlineToRtf(html);
//   html = convertStrikeoutToRtf(html);
//   html = convertSuperscriptToRtf(html);
//   html = convertSubscriptToRtf(html);
//   html=convertAlignmentToRtf(html);
//   html=convertListToRtf(html);

//   // Add more conversions for other HTML tags as needed

//   // Return the final RTF content
//   return `{\\rtf1\\ansi\\ansicpg1252\\deff0\\pard ${html}\\par}`;
// }
// // Convert <ol> and <ul> tags to RTF format
// const convertListToRtf = (html) => {
//   // Convert <ol> tags to RTF numbered list
//   html = html.replace(/<ol>(.*?)<\/ol>/g, (match, p1) => {
//     const items = p1.split("</li><li>");
//     let rtfList = "";
//     items.forEach((item, index) => {
//       rtfList += `\\li${index + 1} ${item
//         .replace("<li>", "")
//         .replace("</li>", "")}\\line `;
//     });
//     return `${rtfList}\\line `;
//   });

//   // Convert <ul> tags to RTF bullet list
//   html = html.replace(/<ul>(.*?)<\/ul>/g, (match, p1) => {
//     const items = p1.split("</li><li>");
//     let rtfList = "";
//     items.forEach((item) => {
//       rtfList += `\\bullet ${item
//         .replace("<li>", "")
//         .replace("</li>", "")}\\line `;
//     });
//     return `${rtfList}\\line `;
//   });

//   return html;
// };

// // Convert text alignment to RTF format
// const convertAlignmentToRtf = (html) => {
//   html = html.replace(
//     /<div style="text-align:(.*?)">(.*?)<\/div>/g,
//     (match, p1, p2) => {
//       let alignment = "";
//       switch (p1) {
//         case "left":
//           alignment = "\\ql";
//           break;
//         case "center":
//           alignment = "\\qc";
//           break;
//         case "right":
//           alignment = "\\qr";
//           break;
//         case "justify":
//           alignment = "\\qj";
//           break;
//         default:
//           alignment = "\\ql"; // Default to left alignment
//           break;
//       }
//       return `${alignment} ${p2}\\line `;
//     }
//   );

//   return html;
// };

// // Add more functions for header tags, font, font size, font color, highlight, etc.

// const handleExport = () => {
//   // Get the content from the editor
//   const htmlContent = document.getElementById("text-input").innerHTML;

//   // Convert HTML content to RTF format
//   const rtfContent = htmlToRtf(htmlContent);

//   // Create a Blob containing the RTF content
//   const blob = new Blob([rtfContent], { type: "text/rtf" });

//   // Create a temporary URL for the Blob
//   const url = window.URL.createObjectURL(blob);

//   // Create a temporary anchor element
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = "exported_content.rtf";
//   a.click();

//   // Release the URL object to free up memory
//   window.URL.revokeObjectURL(url);
// };

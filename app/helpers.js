/**
 * Creates a div within the debug block on the window with the specified ID.
 * Repeate calls with the same ID will overwrite the content in the existing div.
 * @param {string} id The ID to assign the HTML div
 * @param {string} content The content to set within the HTML div
 * @returns {boolean} If the function ran as expected
 */
export function debug(id, content = "")
{
    if (!document.getElementById('debug') || !validString(id) || !validString(content)) {
        return false;
    }

    let existingDiv = document.getElementById(id);
    
    if (!existingDiv) {
        const debugDiv = document.getElementById('debug');
        const newDiv = document.createElement('div');
        newDiv.id = id;
        debugDiv.appendChild(newDiv);
        existingDiv = newDiv;
    }
    existingDiv.innerHTML = id + ": " + content;
    return true;
}

/**
 * Checks that the given variable is a string and isn't blank.
 * @param {*} stringVariable The variabel to test
 * @returns {boolean} If the given variable is a valid string
 */
export function validString(stringVariable)
{
    if (typeof stringVariable === 'string' && stringVariable.trim().length > 0) {
      return true;
    }
    return false;
}


export async function loadJSONData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading JSON data:', error.message);
    return null;
  }
}


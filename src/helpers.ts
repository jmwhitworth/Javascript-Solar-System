/**
 * Updates or creates a debug message in a specific HTML element.
 *
 * This function checks if an element with the given `id` exists within the
 * element with the id 'debug'. If it does not exist, it creates a new `div`
 * element with the given `id` and appends it to the 'debug' element. It then
 * updates the inner HTML of the element with the provided `content`.
 *
 * @param id - The unique identifier for the debug message element.
 * @param content - The content to be displayed in the debug message element. Defaults to an empty string.
 * @returns `true` if the debug element exists and the message was updated or created, `false` otherwise.
 */
export function debug(id: string, content: string = "")
{
    if (!document.getElementById('debug')) {
        return false;
    }

    let existingDiv = document.getElementById(id);
    
    if (!existingDiv) {
        const debugDiv = document.getElementById('debug');
        const newDiv = document.createElement('div');
        newDiv.id = id;
        if (debugDiv) {
            debugDiv.appendChild(newDiv);
        }
        existingDiv = newDiv;
    }
    existingDiv.innerHTML = id + ": " + content;
    return true;
}



/**
 * Asynchronously loads JSON data from the specified URL.
 *
 * @param url - The URL to fetch the JSON data from.
 * @returns - A promise that resolves to the parsed JSON data, or null if an error occurs.
 * @throws - If the network response is not ok.
 */
export async function loadJSONData(url:string) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error: any) {
        console.error('Error loading JSON data:', error.message);
        return null;
    }
}
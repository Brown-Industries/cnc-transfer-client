
export async function getProgramList() {
    const response = await fetch('/api/files');
    // console.log(response);
    return await response.json();
}
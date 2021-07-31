
export async function sendProgram(data) {
    // console.log(response);
    const response = await fetch(`/api/transfer/send`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({filename: data})
      })
      return await response.json();
}
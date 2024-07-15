const API_KEY = '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';

export async function sendMessage(model, message) {
  console.log('Sending request to model:', model);
  console.log('Message:', message);

  const response = await fetch(
    `https://api-inference.huggingface.co/models/${model}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ inputs: message }),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const contentType = response.headers.get("content-type");
  console.log('Response content type:', contentType);

  if (contentType && contentType.startsWith("application/json")) {
    const result = await response.json();
    console.log('API Response:', result);

    if (Array.isArray(result) && result[0].generated_text) {
      return result[0].generated_text;
    } else if (typeof result === 'object' && result.generated_text) {
      return result.generated_text;
    } else if (typeof result === 'string') {
      return result;
    } else {
      console.error('Unexpected response format:', result);
      throw new Error('Unexpected response format from API');
    }
  } else {
    // Handle image response
    const blob = await response.blob();
    console.log('Image blob:', blob);
    return URL.createObjectURL(blob);
  }
}
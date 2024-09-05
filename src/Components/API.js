
const EVERFLOWAPI = 'https://bb-backend-v1-648bba4d2433.herokuapp.com/api/v1/usdisability'; 


export const submitQuoteForm = async (formData) => {
  try {
    const response = await fetch(`${EVERFLOWAPI}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Success:', data);
    return data; 
  } catch (error) {
    console.error('Error:', error);
    throw error; 
  }
};

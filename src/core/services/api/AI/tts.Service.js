export const fetchAudioForText = async (text) => {
  try {
    const apiKey = import.meta.env.VITE_ARIANA_API_KEY;

    if (!apiKey) {
      console.error("API Key Not Found!");
      return null;
    }

    const response = await fetch('https://api.farsireader.com/ArianaCloudService/ReadText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Text: text,
        Speaker: "Female1",
        PitchLevel: "0",
        PunctuationLevel: "0",
        SpeechSpeedLevel: "0",
        ToneLevel: "0",
        GainLevel: "0",
        BeginningSilence: "0",
        EndingSilence: "0",
        Format: "mp3",
        Base64Encode: "0",
        Quality: "normal",
        APIKey: apiKey
      }),
    });

    if (!response.ok) {
      throw new Error(`Ariana Voice Server Error! : ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && (contentType.includes("application/json") || contentType.includes("text"))) {
      const errorText = await response.text();
      console.error("Server Responded with This instead of voice file:", errorText);
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();

    const audioBlob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
    const audioUrl = URL.createObjectURL(audioBlob);

    return audioUrl;

  } catch (error) {
    console.error('Error Connecting Voice Service!:', error);
    return null;
  }
};
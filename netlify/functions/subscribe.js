exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const { email, name } = JSON.parse(event.body);

  const ML_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiNTJlYjM3NGQ0Yjk0NTI1MjAwOWEyODBmZjM2Y2RjOWEyZDkyMjI4ZGZiNzMwYzY5NGUwODk2Y2Y2NTNiZjE0YjBkOGIzOGFiN2UxNWNkMzAiLCJpYXQiOjE3NzQ1Njg4NzQuNDU4ODQ1LCJuYmYiOjE3NzQ1Njg4NzQuNDU4ODQ4LCJleHAiOjQ5MzAyNDI0NzQuNDU0NDUyLCJzdWIiOiIyNzUwNiIsInNjb3BlcyI6W119.Agt-E9YN3ya7S1AiZcGQpU80nLfNvFRxeBowiA9lQPG3kHYkfDHbi8mZ7ms_vR5DzuXdfMVilKh2lnZ1SgFfMR7XhzRl9u_VoLKJZs5FxezjpAga6Trerq6ud4HNVwr3HZbDMOH4x8SXjtrJWN8QhGENzRHLpsVJj-NJxNTJjwHrewwduW3rgjUZzdtvh6JQoo0Y4WbwFtH21oRB48LOKzwBuEVGlpxnP_jCM-TU9KacDnFeGtfpl3yZ3Uuxqfws8gQdH9DcFgBSqd3DMQWiQGodCNRKuVUlINhAI92oIvA7SmoUabDMsGib-jJJ9Zor3IjSkiKe0Lrv4rALahKyAApsM91gnQbXB_Jc5xJDY8K60Bi6Xi-OJRFllIBSXAGN5tHgBBZSLxjizhyzPbvACACP96Ql5nSUVZqwYT0F-4adF_uF_zJvnGJy-ODBVoDHPHib3p2Ys2B6oeFrJiF2JAePZjt6Hs9Okf1jeir3v7t_GZtRyYeg4vHPXlVXtv3uh2LZq2QDmqI17TVAX0t_Gu34t3MQWk2t_v2kieS1gird68nNFWpYta63rfukyJNBTz1yRasT6imVlw0AkFv-mD9C47_0Dc17UIZMkYWiGH0vwlMsH9a_y5KJ-vVdfrHXkj_AfMzVrhCFur3KYRo0mcDIOOtK84KXWzkzKyFVjJk';
  const ML_GROUP_ID = '173046043426948337';

  try {
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${ML_API_KEY}`
      },
      body: JSON.stringify({
        email,
        fields: { name },
        groups: [ML_GROUP_ID]
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true, data })
    };
  } catch(e) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: false, error: e.message })
    };
  }
};

from flask import Flask, request, jsonify
from flask_cors import CORS
from youtube_transcript_api import YouTubeTranscriptApi

app = Flask(__name__)
CORS(app)  # Enable CORS

def extract_video_id(video_link):
    return video_link.split('=')[-1]

@app.route('/transcript', methods=['GET', 'POST'])
def get_transcript():
    if request.method == 'POST':
        video_link = request.json['videoLink']
        video_id = extract_video_id(video_link)
        
        print(f"Received request for video link: {video_link}")
        print(f"Extracted video ID: {video_id}")
        
        # Fetch transcript using youtube-transcript-api
        try:
            transcript = YouTubeTranscriptApi.get_transcript(video_id)  # Use video ID, not link
            transcript_text = ' '.join([t['text'] for t in transcript])
            return jsonify({'transcript': transcript_text})
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'message': 'Method Not Allowed'}), 405

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)


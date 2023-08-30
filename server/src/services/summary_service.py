text = """
Title: The Forgotten Diary

Once upon a time, in a quiet little town nestled between rolling hills, there lived an elderly woman named Evelyn. She was known throughout the town for her warm smile, wise advice, and a peculiar habit of carrying a tattered old diary with her wherever she went.

Evelyn's diary was her most prized possession. It was filled with handwritten entries dating back to her childhood. Each page held a piece of her life, a memory, or a heartfelt reflection. But what made this diary truly special was the secret it held, a secret known only to Evelyn herself.

The town's children often asked her about the diary, curious about its contents. Evelyn would chuckle and say, "It's the story of my life, my dear. A story that's yet to be completed." She would then share snippets of her adventures, painting pictures with words that ignited the imagination of those who listened.

One crisp autumn morning, as the leaves rustled in the wind and the scent of pumpkin spice filled the air, Evelyn embarked on her usual stroll to the town's park. As she settled on her favorite bench, she noticed a young girl, Emily, sitting alone on a nearby swing. Emily seemed upset, her tear-filled eyes fixed on the ground.

Evelyn, always eager to lend an empathetic ear, approached the girl. "What troubles you, dear?" she asked.

Emily looked up, her eyes meeting Evelyn's kind gaze. "It's my grandma," she replied. "She's very sick, and the doctors say she might not have much time left."

Evelyn nodded sympathetically. "I'm so sorry to hear that, Emily. It's never easy to see someone you love in pain."

Emily wiped away a tear and asked, "Do you think you could read me a story from your diary? Your stories always make me feel better."

Evelyn smiled and agreed. She opened her diary to a random page and began to read. Her voice was like a soothing melody, and as the words flowed, the park seemed to transform. The trees whispered secrets, and the leaves danced to the rhythm of her voice.

As the story unfolded, Emily's tears turned to smiles, and her heart felt lighter. Evelyn's words wove a tale of courage, friendship, and the enduring power of love. When Evelyn finished, Emily looked at her with gratitude in her eyes. "Thank you," she said. "Your stories are like magic."

Evelyn patted Emily's hand. "Stories have a special kind of magic, my dear. They can transport us to far-off places and bring comfort in our darkest hours."

Weeks turned into months, and Emily continued to visit Evelyn in the park. Each time, Evelyn would read from her diary, sharing stories of her youth, her travels, and the lessons she had learned. Emily's bond with Evelyn deepened, and the old woman became like a second grandmother to her.

One winter day, Evelyn fell ill. She knew her time was drawing near, and she wanted to share one last story with Emily. She handed her beloved diary to the girl and said, "This story is the most important one, dear Emily. It's the story of our friendship."

Emily read the final entry in Evelyn's diary, tears streaming down her cheeks. The story spoke of the precious moments they had shared, the laughter and tears, and the wisdom Evelyn had imparted.

Evelyn passed away that night, leaving behind a town that mourned her deeply. But she also left behind a legacy of stories and a young girl who would carry those stories in her heart forever.

Emily continued to visit the park, carrying Evelyn's diary with her. She shared the stories with new friends and generations to come, ensuring that Evelyn's wisdom and the magic of her stories would live on.

And so, in that quiet little town nestled between rolling hills, the memory of Evelyn and her tattered old diary lived on, reminding everyone that stories have the power to heal, inspire, and connect us across generations.
"""

output = """
 An elderly woman in a small town was known for her warm smile and wise advice . She was known for sharing stories with a young girl who became like a second grandmother . Evelyn's diary was her most prized possession, filled with handwritten entries dating back to her childhood . She shared the stories with new friends and generations to come . Evelyn died that night, leaving behind a legacy of stories and a young girl who would carry those stories in her heart forever . The story wove a tale of courage, friendship, and the enduring power of love .
"""

def get_summary(input_text:str):
    """
    Generate a summary for the input text.
    """
    # For this simple example, let's just return the input text as the summary.
    print("[server] Function to generate summary is executing.")

    from happytransformer import HappyTextToText, TTSettings
    happy_tt1 = HappyTextToText("BERT", "sshleifer/distilbart-cnn-12-6")
    result1 = happy_tt1.generate_text(input_text, args=TTSettings(min_length=100, max_length=200))
    print(result1.text)
    return result1.text

if __name__ == '__main__':
    get_summary(text)
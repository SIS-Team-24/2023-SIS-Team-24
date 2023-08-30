text = """
In light of recent news from Apple, facial recognition technology is now the talk of the town. Ranging from privacy concerns to a curious boyfriend unlocking his girlfriend’s phone while she sleeps. The first commercial application of 3D facial recognition means that biometric technology is advancing at a staggering rate but so is the ability to hack or fool facial recognition tech.

Today, 99% of the infrastructure scattered around the world consists of 2D cameras capable of running advanced facial recognition software and it will likely be years before a physical overhaul to 3D cameras takes place. Hackers, hobbyists, educators and the like have been developing creative ways to either fool or hide from 2D face recognition in a perpetually innovative game of cat and mouse.

The introduction of 3D recognition will give way to an entirely new thought process of how to beat an incredibly advanced technology, and also raise some questions as to how and by whom it will be used. The fight is futile as the effort exerted to trick this technology is better spent working with the facial recognition companies to enforce acceptable regulations.

First, I question the intention of these types of face recognition-fooling solutions. Are they for bad actors hoping to sneak away undetected? Are they for people who are concerned about their picture being stored in a massive database (I’d worry more about posting a picture to Facebook…)? Are they to demonstrate the inherent risk of biometric information?

The variations that humans have designed to deceive the machine are more likely to make you stand out than blend in. Such as custom makeup, hairstyles, masks, a pair of glasses designed at Carnegie Melon consisting of camouflage patterns or simply wearing a box over your head. Some of them are realistic, but most are just for fun

As these techniques improve, so does the technology capable of identifying and training against them resulting in more robust face recognition software. These solutions seem like a great way to protect individuals who are looking to keep their identity hidden for nefarious reasons.
A further concern would be detecting an attempt to impersonate an individual by using a picture of their face. With 3D cameras, this type of hack is very difficult to achieve due to the complexity of depth measurements. Facial recognition technology can run liveness detection or use additional hardware for heat sensing, both of which are capable of being tricked to a degree as seen with Samsung and Google.

The availability of public facial images is far more concerning due to the ease of which you would be able to render a 3D model from a small set of images and use virtual reality tools to project a face.

On the surface, these types of hacks would seem alarming but if gaining access to your phone now is as easy as guessing a 4-digit passcode, society should deem these tolerable risks.

Ultimately it is on facial recognition companies and Trueface to mitigate this risk by being more innovative, detecting consistencies in attacks and training the technology to identify when hacks occur. This game will continue to be played and become significantly more sophisticated with the adoption of 3D facial recognition.

"""

output = """
Apple announced the use of facial recognition technology for its iPhone . The first commercial application of 3D facial recognition means that biometric technology is advancing at a staggering rate . 
Hackers, hobbyists, educators and the like have been developing creative
"""

def get_summary(input_text:str):
    """
    Generate a summary for the input text.
    """
    # For this simple example, let's just return the input text as the summary.
    print("[server] Function to generate summary is executing.")

    from happytransformer import HappyTextToText
    happy_tt1 = HappyTextToText("BERT", "sshleifer/distilbart-cnn-12-6")
    result1 = happy_tt1.generate_text(input_text)
    print(result1.text)
    return result1.text

if __name__ == '__main__':
    get_summary(text)
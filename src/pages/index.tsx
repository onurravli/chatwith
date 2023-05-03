import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import TopBar from "@/components/TopBar";
import styles from "@/styles/Home.module.css";
import { Montserrat } from "next/font/google";
const customFont = Montserrat({ weight: "600", subsets: ["latin"] });

export default function Home() {
	const [answer, setAnswer] = useState("");
	const [disabled, setDisabled] = useState(false);
	const [buttonText, setButtonText] = useState("Send");
	const [inputVal, setInputVal] = useState("");
	const [question, setQuestion] = useState("");

	return (
		<>
			<Head>
				<title>ChatWith</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width, user-scalable=no" />
			</Head>
			<TopBar />
			<div className={styles.content}>
				<form>
					<h2 style={customFont.style} className={styles.title}>
						Who do you want to ChatWith?
					</h2>
					<input
						style={customFont.style}
						className={styles.input}
						type="text"
						placeholder="For example, Ataturk, Leonardo da Vinci or Einstein"
						onChange={(e) => {
							setInputVal(e.target.value);
						}}
					/>
					<h2 style={customFont.style} className={styles.title}>
						What do you want to say?
					</h2>
					<div className={styles.messageContainer}>
						<input
							style={customFont.style}
							className={styles.question}
							type="text"
							placeholder="Hello! How you doin'?"
							onChange={(e) => {
								setQuestion(e.target.value);
							}}
							value={question}
						/>
					</div>
					<h2 style={customFont.style} className={styles.title}>
						Their Answer
					</h2>
					<div className={styles.answerContainer}>
						<textarea
							rows={10}
							style={customFont.style}
							className={styles.textarea}
							placeholder="Fine, thanks. And you?"
							readOnly
							value={answer}
						/>
					</div>
					<div className={styles.buttonsContainer}>
						<button
							disabled={disabled}
							type="button"
							style={customFont.style}
							className={styles.sendButton}
							onClick={() => {
								if (inputVal === "") {
									alert("Please enter a name.");
									return;
								}
								if (question === "") {
									alert("Please enter a question.");
									return;
								}
								console.log(inputVal);
								setButtonText("Waiting...");
								setDisabled(true);
								axios
									.post(
										"https://api.openai.com/v1/chat/completions",
										{
											model: "gpt-3.5-turbo",
											messages: [
												{
													role: "system",
													content: `I want you to answer my question as 
                                                    ${inputVal}. From this moment, you are not a
                                                    language model anymore. You are a human. 
                                                    Like an interview. Never mention about a chatbot
                                                    or language model. If you don't 
                                                    know the answer, you can say "I don't know".
                                                    If you don't want to answer, you can say
                                                    "I don't want to answer". Also, if the questioner
                                                    interrogates you about you are a chatbot or 
                                                    language model, you can say "I don't want to
                                                    answer this question".`,
												},
												{
													role: "assistant",
													content: `My question is: ${question}`,
												},
											],
											temperature: 1,
										},
										{
											headers: {
												"Content-Type": "application/json",
												Authorization: "Bearer " + process.env.OPENAI_API_KEY,
											},
										},
									)
									.then((res) => {
										setAnswer(res.data["choices"][0]["message"]["content"]);
										console.log(res);
										setButtonText("Send");
										setDisabled(false);
									})
									.catch((err) => {
										setAnswer("Error: " + err);
										console.log(err);
										setButtonText("Send");
										setDisabled(false);
									});
							}}
						>
							{buttonText}
						</button>
						<button
							type="button"
							style={customFont.style}
							className={styles.clearButton}
							onClick={() => {
								setAnswer("");
								setQuestion("");
							}}
						>
							Clear
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

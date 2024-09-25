"use client";
import {useEffect, useState} from "react";

import "@tensorflow/tfjs"
import * as toxicity from "@tensorflow-models/toxicity";

export default function Page(){
    const threshold = 0.5;
    const [toxicityPredictions, setToxicityPredictions] = useState<null | object>(null)

    useEffect(() => {
        toxicity.load(threshold, []).then((model) => {
            const sentences = ["Ony3 aye gbemi", "You are a poopy head!", "I like turtles", "Shut up!"]
            model.classify(sentences).then(predictions => {
                console.log(JSON.stringify(predictions, null, 2));
                setToxicityPredictions(predictions)
            })
        })
    }, []);

    return (
        <div>
            <h1> This is the Toxicity page </h1>
            {
                toxicityPredictions ?
                    <div>
                        <h2> Toxicity Predictions </h2>
                        <p>The results are in the console</p>
                    </div>
                    : null
            }
        </div>
    )
}
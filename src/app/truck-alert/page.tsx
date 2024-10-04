"use client";
import { useEffect, useState } from "react";
import "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

type predictionObject = {
    className: string;
    probability: number;
}

export default function TruckAlert() {
    const [imagePredictions, setImagePredictions] = useState<null | predictionObject[]>(null)

    useEffect(() => {
        const loadModelAndClassify = async () => {
            const model = await mobilenet.load();
            const image = document.getElementById("truck") as HTMLImageElement;
            const predictions = await model.classify(image);
            console.log(predictions);
            setImagePredictions(predictions);
        };

        loadModelAndClassify();
    }, []);

    return(
        <div>
            <h1>This is the truck alert page</h1>
            <img id="truck" src="/truck1.jpeg" alt="truck" width={200} height={200} />
            {
                imagePredictions ?
                    <div>
                        <h2>Image Predictions</h2>
                        <div>
                            {
                                imagePredictions.map((prediction: predictionObject) => {
                                    return (
                                        <div key={prediction.className}>
                                            <p>{prediction.className}</p>
                                            <p>{(prediction.probability * 100).toFixed(2)}%</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    : null
            }
        </div>
    )
}
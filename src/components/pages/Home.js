import React from 'react';
import axios from 'axios';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import spaceimg from '../../images/background-space.jpg';
import DatePicker from '../material/DatePicker';
import translate from "translate";
import Speech from 'speak-tts'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme)=>({
    mainGrid:{
        background: 'black',
        backgroundSize: 'cover',
        backgroundPosition:'center',
    },
    box1:{
        margin:'auto'
    }
}))

const Home = (props) => {

    const classes = useStyles();
    const apikey = props.apiKey;
    const [infoApod,setInfoApod] = React.useState([])
    const [actualDate,setActualDate] = React.useState(''); // create a default value with actual date
    const [disableTTSButton, setDisableTTSButton] = React.useState(false);
    
    const speech = new Speech();
    
    const prepareTTS = () => {
        speech.init({
            'volume': 1,
             'lang': 'es-ES',
             'rate': 1,
             'pitch': 1,
             'voice':'Cleveland',
             'splitSentences': true,
             'listeners': {
                 'onvoiceschanged': (voices) => {
                     console.log("Event voiceschanged", voices)
                 }
             }
     }).then((data) => {
            // The "data" object contains the list of available voices and the voice synthesis params
            console.log("Speech is ready, voices are available", data)

        }).catch(e => {
            console.error("An error occured while initializing : ", e)
        })
    }

    const testTTS = () => {
        setDisableTTSButton(true);
        speech.speak({
            text: infoApod.explanation,
            queue: false, // current speech will be interrupted,
            listeners: {
                onstart: () => {
                    console.log("Start utterance")
                },
                onend: () => {
                    console.log("End utterance")
                    setDisableTTSButton(false);
                },
                onresume: () => {
                    console.log("Resume utterance")
                },
                onboundary: (event) => {
                    console.log(event.name + ' boundary reached after ' + event.elapsedTime + ' milliseconds.')
                }
            }
        }).then(() => {
            console.log("Success !")
        }).catch(e => {
            console.error("An error occurred :", e)
        })
    }
    
    const onChangeDate = (date) => {
        setActualDate(date);
    }

    const search = async () => {
        let r = await axios({
            method:'get',
            url:'https://api.nasa.gov/planetary/apod?api_key='+apikey,
            params:{
                date : actualDate
            }
        })
        const title = await t(r.data.title);
        const explanation = await t(r.data.explanation);
        r.data.title = title;
        r.data.explanation = explanation;
        setInfoApod(r.data)
    }

    const outByType = (option) => {
        if(option == 'image'){
            return <img src={infoApod.url} style={{width:'95%',height:'800px',border:'10px solid white'}} />;
        }
        if(option == 'video'){
            return <iframe src={infoApod.url} width="520" height="300"></iframe>;
        }
    }

    const t = async (_msg) => {
        const text = await translate(_msg, "es");
        return text;
    }

    const renderButton = () => {
        if(disableTTSButton) {
            return <CircularProgress />
        } else {
            return <Button variant="contained" color="secondary" style={{marginTop:'5px',textTransform:'none',marginLeft:'15px'}} onClick={testTTS} disabled={disableTTSButton}> Leer </Button>
        }
    }

    const outAPOD = () => {
        return(
            <>
                <Grid item xs={12} style={{padding:'30px'}} className={classes.mainGrid}>
                    <Grid item xs={11} style={{margin:'auto',background:'rgb(0 0 0 / 29%)',color:'white',padding:'15px',borderRadius:'10px',marginBottom:'35px'}}>
                        <Grid item xs={12}> <h1> ¿ Que capturo la NASA el dia de hoy ? </h1> </Grid>
                        <Grid item xs={5} style={{margin:'auto',paddingBottom:'25px'}} container>
                            <Grid item xs={5} className={classes.box1}> <DatePicker onChangeDate={onChangeDate} /> </Grid>
                            <Grid item xs={5} className={classes.box1} container> 
                                <Button variant="contained" color="secondary" style={{marginTop:'5px',textTransform:'none', marginRight : '18px'}} onClick={search}> Buscar </Button>
                                {renderButton()}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={11} style={{margin:'auto',background:'rgb(0 0 0 / 29%)',color:'white',padding:'15px',borderRadius:'10px',marginBottom:'35px'}}>
                        <h2>{infoApod.title}</h2>
                        <h3 style={{textAlign:'justify',padding:'15px'}}>{infoApod.explanation}</h3>
                    </Grid>
                    <Grid item xs={11} style={{margin:'auto',background:'rgb(0 0 0 / 29%)',color:'white',borderRadius:'10px',marginBottom:'35px',padding:'15px'}}>
                    {outByType(infoApod.media_type)}
                    </Grid>
                </Grid>
            </>
        )
    }

    const getData = async () => {
        let r = await axios({
            method:'get',
            url:'https://api.nasa.gov/planetary/apod?api_key='+apikey
        })
        const title = await t(r.data.title);
        const explanation = await t(r.data.explanation);
        r.data.title = title;
        r.data.explanation = explanation;
        setInfoApod(r.data)
    }

    React.useEffect(()=>{
        getData();
        // TTS
        if(speech.hasBrowserSupport()) { // returns a boolean
            console.log("TTS enable ...");
            prepareTTS();
        }
    },[])

    return(
        <>
        {outAPOD()}
        </>
    )
}

export default Home;
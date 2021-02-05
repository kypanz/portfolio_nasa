import React from 'react';
import axios from 'axios';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import spaceimg from '../../images/background-space.jpg';
import DatePicker from '../material/DatePicker';
import translate from 'translate-google';

const useStyles = makeStyles((theme)=>({
    mainGrid:{
        background: '#393c94',
        backgroundSize: 'cover',
        backgroundPosition:'center'
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
    
    const onChangeDate = (date) => {
        setActualDate(date);
    }

    const search = async () => {
        // crea consulta por fecha seleccionada || create a request with the selected date
        let r = await axios({
            method:'get',
            url:'https://api.nasa.gov/planetary/apod?api_key='+apikey,
            params:{
                date : actualDate
            }
        })
        console.log(r);
        translate('I speak Chinese', {to: 'zh-cn'}).then(res => {
            console.log(res)
        }).catch(err => {
            console.error(err)
        })
        //setInfoApod(r.data)
    }

    const outByType = (option) => {
        if(option == 'image'){
            return <img src={infoApod.url} style={{width:'95%',height:'800px',border:'10px solid white'}} />;
        }
        if(option == 'video'){
            return <iframe src={infoApod.url} width="520" height="300"></iframe>;
        }
    }

    const outAPOD = () => {
        return(
            <>
                <Grid item xs={12} style={{padding:'30px'}} className={classes.mainGrid}>
                    <Grid item xs={11} style={{margin:'auto',background:'rgb(0 0 0 / 29%)',color:'white',padding:'15px',borderRadius:'10px',marginBottom:'35px'}}>
                        <Grid item xs={12}> <h1> ¿ Que capturo la NASA en esta fecha ? </h1> </Grid>
                        <Grid item xs={5} style={{margin:'auto',paddingBottom:'25px'}} container>
                            <Grid item xs={5} className={classes.box1}> <DatePicker onChangeDate={onChangeDate} /> </Grid>
                            <Grid item xs={5} className={classes.box1}> 
                                <Button variant="contained" color="secondary" style={{marginTop:'5px',textTransform:'none'}} onClick={search}> Buscar </Button>
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
        setInfoApod(r.data)
    }

    React.useEffect(()=>{
        getData();
    },[])

    return(
        <>
        {outAPOD()}
        </>
    )
}

export default Home;
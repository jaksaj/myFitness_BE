const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

mongoose.connect('mongodb://127.0.0.1:27017/myFitness', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Greška pri spajanju:', error);
});
db.once('open', function() {
  console.log('Spojeni smo na MongoDB bazu');
});

const shema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
})

const primjerKorisnika = mongoose.model('User', shema)

app.use(bodyParser.json());

app.post('mongodb://127.0.0.1:27017/myFitness', async (req, res) => {
  try {
    
    const { username, mail, lozinka } = req.body;

    
    const noviKorisnik = new primjerKorisnika({ username, mail, lozinka });

    
    await noviKorisnik.save();

    //šaljen odg na frontend
    res.status(200).json({ success: true, message: 'Registracija je uspješna!' });

    //kreiran token da bi korisnik ostao logiran
    const token = jwt.sign({ username }, 'tajna', { expiresIn: '1h' });

    //šaljen token natrag na frontend
    res.status(200).json({ success: true, message: 'Prijava uspješna!', token });
  } catch (error) {
    console.error('Greška prilikom registracije:', error);
    res.status(500).json({ success: false, message: 'Došlo je do pogreške prilikom registracije.' });
  }
});

//do tu registracija

//odavde prijava

const bcrypt = require('bcrypt');

app.post('mongodb://127.0.0.1:27017/myFitness', async (req, res) => {
  try {
    const { username, lozinka } = req.body;

    //traženje korisnika po imenu
    const pronadjeniKorisnik = await primjerKorisnika.findOne({ username });

    if (!pronadjeniKorisnik) {
      //korisnik ne postoji
      return res.status(401).json({ success: false, message: 'Pogrešno korisničko ime ili lozinka.' });
    }

    //provjeravanje lozinke
    const bcrypt = require('bcrypt');
    const lozinkaUsporedba = await bcrypt.compare(lozinka, pronadjeniKorisnik.lozinka);

    if (!lozinkaUsporedba) {
      //lozinka je kriva
      return res.status(401).json({ success: false, message: 'Pogrešno korisničko ime ili lozinka.' });
    }

    //saljemo odg na frontend ako je ispravno
    res.status(200).json({ success: true, message: 'Prijava uspješna!' });

    //kreiran token da bi korisnik ostao logiran
    const token = jwt.sign({ username }, 'tajna', { expiresIn: '1h' });

    //šaljen token natrag na frontend
    res.status(200).json({ success: true, message: 'Prijava uspješna!', token });

  } catch (error) {
    console.error('Greška prilikom prijave:', error);
    res.status(500).json({ success: false, message: 'Došlo je do pogreške prilikom prijave.' });
  }
  
  
});

//triba još vidit da sve dobro komunicira sa svim
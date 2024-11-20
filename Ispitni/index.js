class Patient {
    constructor(name) {
        this.name = name;
        this.id = parseInt(Math.random() * 1000);
    }
}

class CovidPositive extends Patient {

    constructor(name, date, gender, age, region, symptoms = false, respiratoryIssue = false, hyperqlycaemia = false, positive = false) {
        super(name);
        this.positive = positive
        this.date = date;
        this.gender = gender;
        this.age = age;
        this.symptoms = symptoms;
        this.respiratoryIssue = respiratoryIssue;
        this.hyperqlycaemia = hyperqlycaemia;
        this._region = region;
    }

    risk() {
        if (this.symptoms && this.respiratoryIssue && this.hyperqlycaemia) {
            if (this.age > 75) {
                console.log(`Patient ${this.id} ${this.name} is with high risk`)
            } else if (this.age > 50 && this.gender === 'male') {
                console.log(`Patient ${this.id} ${this.name} is with high risk`)
            } else {
                console.log(`Patient ${this.id} ${this.name} is with average risk`)
            }
        } else if (!this.symptoms && this.respiratoryIssue && this.hyperqlycaemia && this.positive) {
            console.log(`Patient ${this.id} ${this.name} is with high risk`)
        } else if (this.symptoms && !this.respiratoryIssue && !this.hyperqlycaemia && this.positive) {
            console.log(`Patient ${this.id} ${this.name} is with low risk`)
        } else if (this.symptoms && this.respiratoryIssue && !this.hyperqlycaemia && this.positive) {
            console.log(`Patient ${this.id} ${this.name} is with average risk`)
        } else if (this.symptoms && !this.respiratoryIssue && this.hyperqlycaemia && this.positive) {
            console.log(`Patient ${this.id} ${this.name} is with average risk`)
        } else {
            console.log(`Patient ${this.id} ${this.name} is with low risk (resistant of covid)`)
        }
    }


    get region() {
        return this._region;
    }

    toString() {
        console.log(`Patient ${this.id} ${this.name} ${this.positive ? "e pozitiven/a" : "ne e pozitiven/a"}`)
    }
}

class EHospital {
    constructor() {
        this.patients = [];
        this.number = 0;
    }

    add_patient(patient) {
        this.patients.push(patient);
        this.number++;
    }

    test_patient(patient) {
        var date1 = patient.date;
        var date2 = Date.now();
        var diffTime = Math.abs(date2 - date1);
        var diffDays = Math.ceil(diffTime/(1000 * 60 * 60 * 24));
        if (diffDays = 15) {
            patient.positive = false;
        }
    }

    check() {
        for (var p of this.patients) {
            this.test_patient(p);
            p.risk();
        }
    }

    safe_zone(region) {
        var n = 0;
        this.patients.forEach(patient => {
            if (patient.region === region) {
                n++;
            }
        })
        var percentage = ((n / this.patients.length) * 100).toFixed(2);
        console.log(`You are in ${percentage}% safe zone`)
    }

    print() {
        this.patients.forEach(patient => {
            console.log(patient)
        })
    }
}

var hospital = new EHospital();
var a = new CovidPositive("Dejan", new Date(2020,10,17), "male", "50", "Aerodrom", true, true, true);
var b = new CovidPositive("Dejan1", new Date(2020,10,17), "male", "75", "Aerodrom", true, true, true);
var c = new CovidPositive("Dejan2", new Date(2020,11,20), "male", "50", "Dracevo", true, true, true);
var d = new CovidPositive("Dejan3", new Date(2020,11,20), "male", "25", "Aerodrom", false, false, false);
var e = new CovidPositive("Dejan4", new Date(2020,11,9), "male", "50", "Aerodrom", true, false, true);
var f = new CovidPositive("Dejan5", new Date(2020,11,20), "male", "59", "Aerodrom", false, false, false);


hospital.add_patient(a);
hospital.add_patient(b);
hospital.add_patient(c);
hospital.add_patient(d);
hospital.add_patient(e);
hospital.add_patient(f);

hospital.check();
console.log();
hospital.print();
console.log();

hospital.safe_zone("Aerodrom");

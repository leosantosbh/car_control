import "dotenv/config";

import * as Yup from "yup";
import { stringify } from "querystring";

const fs = require("fs");

const db_file = process.env.APP_PATH + "/database/car_control.json";

class CarController {
  async index(req, res) {
    const id_car = req.query.id;

    let carExist = false;
    let find_car = {};
    let loadedCars = JSON.parse(fs.readFileSync(db_file, "utf-8"));

    if (id_car) {
      loadedCars.map(car => {
        if (String(car.id) === id_car) {
          find_car = car;
          carExist = true;
        }
      });
    }

    if (carExist) {
      return res.json(find_car);
    } else {
      return res.json(loadedCars);
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      placa: Yup.string().required(),
      chassi: Yup.string().required(),
      renavam: Yup.string().required(),
      modelo: Yup.string().required(),
      marca: Yup.string().required(),
      ano: Yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Erro de validação" });
    }

    const new_car = req.body;

    let carExist = false;
    let first_car = true;
    let msg = "";
    let id_db = [];
    let loadedCars = JSON.parse(fs.readFileSync(db_file, "utf-8"));

    loadedCars.map(car => {
      first_car = false;
      id_db.push(car.id);
      if (car.placa === new_car.placa) {
        msg = "Placa já Cadastrada!";
        carExist = true;
      } else if (car.chassi === new_car.chassi) {
        msg = "Chassi já Cadastrada!";
        carExist = true;
      } else if (car.renavam === new_car.renavam) {
        msg = "Renavam já Cadastrada!";
        carExist = true;
      }
    });

    if (carExist) {
      return res.status(400).json({ error: msg });
    } else {
      if (first_car) {
        loadedCars.push({
          id: 1,
          ...new_car
        });
      } else {
        loadedCars.push({
          id: Math.max(...id_db) + 1,
          ...new_car
        });
      }
      fs.writeFileSync(db_file, JSON.stringify(loadedCars));
      msg = "Carro cadastrado com sucesso!";
      return res.status(200).json({ success: msg });
    }
  }

  async delete(req, res) {
    const id_car = req.params.id;

    let loadedCars = JSON.parse(fs.readFileSync(db_file, "utf-8"));

    const find_car = loadedCars.findIndex(car => String(car.id) === id_car);

    for (var i = 0; i < loadedCars.length; i++) {
      if (String(loadedCars[i].id) === id_car) {
        loadedCars.splice(i, 1);
        i--;
      }
    }

    fs.writeFileSync(db_file, JSON.stringify(loadedCars));
    return res.json({ success: "Carro removido com sucesso" });
  }

  async update(req, res) {
    const id_car = req.params.id;

    const schema = Yup.object().shape({
      placa: Yup.string().required(),
      chassi: Yup.string().required(),
      renavam: Yup.string().required(),
      modelo: Yup.string().required(),
      marca: Yup.string().required(),
      ano: Yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Erro de validação" });
    }

    const { placa, chassi, renavam, modelo, marca, ano } = req.body;

    let carExist = false;
    let msg = "";
    let id_db = [];
    let loadedCars = JSON.parse(fs.readFileSync(db_file, "utf-8"));

    loadedCars.map(car => {
      id_db.push(car.id);
      if (car.placa === placa) {
        msg = "Placa já Cadastrada!";
        carExist = true;
      } else if (car.chassi === chassi) {
        msg = "Chassi já Cadastrada!";
        carExist = true;
      } else if (car.renavam === renavam) {
        msg = "Renavam já Cadastrada!";
        carExist = true;
      }
    });

    if (carExist) {
      return res.status(400).json({ error: msg });
    } else {
      const find_car = loadedCars.findIndex(car => String(car.id) === id_car);

      const car_new_date = {
        id: loadedCars[find_car].id,
        placa,
        chassi,
        renavam,
        modelo,
        marca,
        ano
      };

      for (var i = 0; i < loadedCars.length; i++) {
        if (String(loadedCars[i].id) === id_car) {
          loadedCars.splice(i, 1);
          i--;
        }
      }

      loadedCars.push(car_new_date);

      fs.writeFileSync(db_file, JSON.stringify(loadedCars));
      return res.json({ success: "Carro atualizado com sucesso" });
    }
  }
}

export default new CarController();

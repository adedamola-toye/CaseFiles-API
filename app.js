require("dotenv").config();
const express = require("express");
const caseRoutes = require("./routes/caseRoutes");
const swaggerJsDoc  = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')

const app = express();
app.use(express.json());

const swaggerOptions = {
    definition: {
        openapi: "3.0.4",
      info: {
        title: 'CaseFiles API',
        description: 'API for managing criminal cases and suspects',
        version: '1.0.0',
        contact: {
          name: 'Adedamola Toye',
          email: 'toye.adedamola@gmail.com',
        },
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: ['./routes/caseRoutes.js'], 
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use("/", caseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;

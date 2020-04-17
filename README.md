# mysql-sequelize-performance-test
<p>Have you ever wondered how much ORMs are slower then db drivers? Well now you can test it!</p>
<p>Just create <code>.env</code> file and provide creds for your mysql db</p>
<p>Available fields you can find in <code>config.js</code> file</p>
<hr>
<h2>Example results</h2>
======================================<br>
==== INSERT 100 rows (one by one) ====<br>
mysql-query: 265.865ms<br>
sequelize-query: 324.281ms<br>
======================================<br>
==== SELECT 100 rows (one by one) ====<br>
mysql-query: 93.304ms<br>
sequelize-query: 183.472ms<br>
======================================<br>
==== UPDATE 100 rows (one by one) ====<br>
mysql-query: 63.456ms<br>
sequelize-query: 125.969ms<br>
======================================<br>
==== DELETE 100 rows (one by one) ====<br>
mysql-query: 43.321ms<br>
sequelize-query: 95.166ms<br>
======================================<br>

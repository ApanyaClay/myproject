'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const users = await queryInterface.sequelize.query(
      'SELECT id FROM users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Hentikan proses jika tidak ada user untuk dihubungkan
    if (users.length === 0) {
      console.log('Tidak bisa membuat seeder payment_methods karena tidak ada data user.');
      return;
    }

    const paymentMethods = [];

    // 2. Untuk setiap user, buat beberapa metode pembayaran
    users.forEach(user => {
      paymentMethods.push(
        // Contoh 1: Kartu Debit
        {
          user_id: user.id,
          name: 'Debit BCA',
          type: 'Debit Card',
          // Simpan detail sebagai JSON string
          details: JSON.stringify({
            bank: 'BCA',
            last4: '1234'
          }),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        // Contoh 2: Kartu Kredit
        {
          user_id: user.id,
          name: 'Kartu Kredit Mandiri',
          type: 'Credit Card',
          details: JSON.stringify({
            bank: 'Mandiri',
            last4: '5678',
            expiryDate: '12/28'
          }),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        // Contoh 3: Akun Bank (untuk transfer)
        {
          user_id: user.id,
          name: 'Rekening Bank BNI',
          type: 'Bank Account',
          details: JSON.stringify({
            bank: 'BNI',
            accountNumber: '0123456789'
          }),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      );
    });

    // 3. Masukkan semua data ke tabel payment_methods
    await queryInterface.bulkInsert('payment_methods', paymentMethods, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('payment_methods', null, {});
  }
};

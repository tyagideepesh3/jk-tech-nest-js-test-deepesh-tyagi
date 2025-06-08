"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "first_name",
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "last_name",
      },
      role: {
        type: Sequelize.ENUM("admin", "editor", "viewer"),
        allowNull: false,
        defaultValue: "viewer",
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        field: "is_active",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        field: "created_at",
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        field: "updated_at",
      },
    });

    // Add indexes
    await queryInterface.addIndex("users", ["email"]);
    await queryInterface.addIndex("users", ["role"]);
    await queryInterface.addIndex("users", ["is_active"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};

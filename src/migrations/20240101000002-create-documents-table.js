"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("documents", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      file_name: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "file_name",
      },
      file_path: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "file_path",
      },
      mime_type: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "mime_type",
      },
      file_size: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "file_size",
      },
      status: {
        type: Sequelize.ENUM("pending", "processing", "completed", "failed"),
        allowNull: false,
        defaultValue: "pending",
      },
      uploaded_by: {
        type: Sequelize.UUID,
        allowNull: false,
        field: "uploaded_by",
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
    await queryInterface.addIndex("documents", ["uploaded_by"]);
    await queryInterface.addIndex("documents", ["status"]);
    await queryInterface.addIndex("documents", ["created_at"]);
    await queryInterface.addIndex("documents", ["title"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("documents");
  },
};

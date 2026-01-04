using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HIMS.Migrations
{
    public partial class v5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblAdress_tblPatient_PatinetId",
                table: "tblAdress");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tblAdress",
                table: "tblAdress");

            migrationBuilder.RenameTable(
                name: "tblAdress",
                newName: "tblAddress");

            migrationBuilder.RenameIndex(
                name: "IX_tblAdress_PatinetId",
                table: "tblAddress",
                newName: "IX_tblAddress_PatinetId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblAddress",
                table: "tblAddress",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tblAddress_tblPatient_PatinetId",
                table: "tblAddress",
                column: "PatinetId",
                principalTable: "tblPatient",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblAddress_tblPatient_PatinetId",
                table: "tblAddress");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tblAddress",
                table: "tblAddress");

            migrationBuilder.RenameTable(
                name: "tblAddress",
                newName: "tblAdress");

            migrationBuilder.RenameIndex(
                name: "IX_tblAddress_PatinetId",
                table: "tblAdress",
                newName: "IX_tblAdress_PatinetId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblAdress",
                table: "tblAdress",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tblAdress_tblPatient_PatinetId",
                table: "tblAdress",
                column: "PatinetId",
                principalTable: "tblPatient",
                principalColumn: "Id");
        }
    }
}
